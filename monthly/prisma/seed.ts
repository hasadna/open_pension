import { PrismaClient } from '@prisma/client'
import { dataFromFile } from "../src/reclamation/reclamation";
import { isEmpty } from 'lodash';

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
    // should be exists here. Remove after fixing the file.
    return null;
  }

  const keyExists = (object: Object, key: string): boolean => Object.keys(object).includes(key);

  if (!keyExists(cache, itemType)) {
    cache[itemType] = {};
  }

  if (!keyExists(cache[itemType], label)) {
    const model = ModelItemTypes[itemType];

    // First, check if the item exists in the DB.
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

      // @ts-ignore
      recordFromDB = await model.create({data});
    } else {
      // We have a model with the ID in the table. Set that one as as the
      // recordFromDB.
      recordFromDB = results;
    }

    // Setting the cache for the next time so we won't hit the DB again.
    cache[itemType][label] = recordFromDB;
  }

  return cache[itemType][label];
}

async function main() {
  const rows = await dataFromFile();

  const funds = [];
  for (let row of rows.splice(1)) {
    // @ts-ignore
    const {FundID, FundName, Channel, SubChannel, HomeBase, ManagingBody, PassiveActive, Status, Type} = row;

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

    funds.push({
      fundID: FundID,
      fundName: fundNameID,
      channel: channelID,
      subChannel: subChannelID,
      homebase: homeBaseID,
      managingBody: managingBodyID,
      passiveActive: passiveActiveID,
      status: statusID,
      type: typeID,
    });

    await prisma.fund.create({data: funds[0]})

    return
  }

  // await prisma.fund.createMany({data: funds});
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
