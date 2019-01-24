import {BigInt} from '@graphprotocol/graph-ts'
import {
  NewExchange
} from '../types/Factory/Factory'

import {
  Directory,
  Exchange,
} from '../types/schema'

export function handleNewExchange(event: NewExchange): void {
  let id = event.params.exchange.toHex()
  let exchange = new Exchange(id)
  exchange.tokenAddress = event.params.token
  exchange.factoryID = '1'
  exchange.ethLiquidity = BigInt.fromI32(0)
  exchange.ethDecimals = 18
  exchange.tokenLiquidity = BigInt.fromI32(0)
  exchange.startTime = event.block.timestamp
  exchange.tradeVolume = BigInt.fromI32(0)
  exchange.tradeCount = BigInt.fromI32(0)
  exchange.totalUniToken = BigInt.fromI32(0)
  exchange.totalUsers = 0

  // hardcoded, but technically could change with upgrades to uniswap protocol
  exchange.version = 1
  exchange.fee = "0.3%"

  exchange.save()

  let factory = Directory.load("1")
  if (factory == null){
    factory = new Directory("1")
    factory.exchangeCount = 0
  }
  factory.exchangeCount = factory.exchangeCount + 1

  factory.save()
}

