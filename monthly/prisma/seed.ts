import { PrismaClient } from '@prisma/client'
import { dataFromFile } from "../src/reclamation/reclamation";
import { isEmpty } from 'lodash';
import {setKeyIfNotEmpty} from "../src/lib/util";

const prisma = new PrismaClient()

enum ItemsTypes {
  Fund = 'fund',
  Channel = 'channel',
  SubChannel = 'subChannel',
  HomeBase = 'homeBase',
  ManagingBody = 'managingBody',
  PassiveActive = 'passiveActive',
  Status = 'status',
  Type = 'type',
}

const ModelItemTypes = {
  [ItemsTypes.Fund]: prisma.fundName,
  [ItemsTypes.Channel]: prisma.channel,
  [ItemsTypes.SubChannel]: prisma.subChannel,
  [ItemsTypes.HomeBase]: prisma.homebase,
  [ItemsTypes.ManagingBody]: prisma.managingBody,
  [ItemsTypes.PassiveActive]: prisma.passiveActive,
  [ItemsTypes.Status]: prisma.status,
  [ItemsTypes.Type]: prisma.type,
};

const ChannelToPrefix = {
  'גמל': 'g',
  'פנסיה': 'p',
  'ביטוח': 'b',
};

let cache: any = {};

async function getOrCreateItem(label: string, itemType: ItemsTypes) {

  if (isEmpty(label)) {
    // The reclamation file has a couple of cells which are empty. Don't know if
    // that a bug so for now we need to this one.
    return null;
  }

  const keyExists = (object: Object, key: string): boolean => Object.keys(object).includes(key);

  if (!keyExists(cache, itemType)) {
    cache[itemType] = {};
  }

  if (!keyExists(cache[itemType], label)) {
    const model = ModelItemTypes[itemType];

    // First, check if the item exists in the DB.
    // Applying the ts-ignore due to unknown model name and typescript has some
    // issues with that.
    // @ts-ignore
    const results = await model.findFirst({where: {label}});

    let recordFromDB;
    if (isEmpty(results)) {
      // The object does not exists in the DB. Create it and the set
      // recordFromDB as the created object.
      const data = {label};

      if (itemType === ItemsTypes.Channel) {
        data['prefix'] = ChannelToPrefix[label];
      }

      // Applying the ts-ignore due to unknown model name and typescript has some
      // issues with that.
      // @ts-ignore
      recordFromDB = await model.create({data});
    } else {
      // We have a model with the ID in the table. Set that one as as the
      // recordFromDB.
      recordFromDB = results;
    }

    // Setting the cache for the next time so we won't hit the DB again.
    cache[itemType][label] = recordFromDB.ID;
  }

  return cache[itemType][label];
}

async function main() {
  const rows = await dataFromFile();

  const seededRecords = await prisma.fund.findMany({
    select: {
      fundID: true,
    }
  });

  const existsFundsIDs: number[] = seededRecords.map(record => record.fundID);
  for (let row of rows.splice(1)) {
    const {FundID, FundName, Channel, SubChannel, HomeBase, ManagingBody, PassiveActive, Status, Type} = row;

    if (existsFundsIDs.includes(FundID)) {
      console.log(`The fund ID ${FundID} already migrated. Skipping.`)
      continue;
    }

    const [fundNameID, channelID, subChannelID, homeBaseID, managingBodyID, passiveActiveID, statusID, typeID] = [
      await getOrCreateItem(FundName, ItemsTypes.Fund),
      await getOrCreateItem(Channel, ItemsTypes.Channel),
      await getOrCreateItem(SubChannel, ItemsTypes.SubChannel),
      await getOrCreateItem(HomeBase, ItemsTypes.HomeBase),
      await getOrCreateItem(ManagingBody, ItemsTypes.ManagingBody),
      await getOrCreateItem(PassiveActive, ItemsTypes.PassiveActive),
      await getOrCreateItem(Status, ItemsTypes.Status),
      await getOrCreateItem(Type, ItemsTypes.Type),
    ];

    const data = {
      fundID: FundID,
      ...setKeyIfNotEmpty('fundName', fundNameID),
      ...setKeyIfNotEmpty('channel', channelID),
      ...setKeyIfNotEmpty('subChannel', subChannelID),
      ...setKeyIfNotEmpty('homebase', homeBaseID),
      ...setKeyIfNotEmpty('managingBody', managingBodyID),
      ...setKeyIfNotEmpty('passiveActive', passiveActiveID),
      ...setKeyIfNotEmpty('status', statusID),
      ...setKeyIfNotEmpty('type', typeID),
    };

    // We cannot use createMany since there might be some data which relies on
    // other data.
    // @ts-ignore
    await prisma.fund.create({data});
    console.log(`Fund ID ${FundID} has been processed to the DB.`)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
