import { PrismaClient } from '@prisma/client'
import {dataFromFile} from "../src/reclamation/reclamation";
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

let cache: any = {};

async function getOrCreateItem(label: string, itemType: ItemsTypes, ) {

  const keyExists = (object: Object, key: string): boolean => Object.keys(object).includes(key);

  if (!keyExists(cache, itemType)) {
    cache[itemType] = {};
  }

  if (!keyExists(cache[itemType], label)) {

    // First, check if the item exists in the DB.
    // if not - create it. If so, get it.
    // Second, check if we need to set the prefix for the channel entry.
    cache[itemType][label] = 1;
  }

  return cache[itemType][label];
}

async function main() {

  const rows = await dataFromFile();
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

  }

  console.log(cache);
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
