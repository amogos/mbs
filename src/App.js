import React from 'react';
import { View } from 'react-native'
import AddNewBookScreen from './screens/add_new_book_screen';
import ShowAllBooksScreen from './screens/show_all_books_screen';

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples even if not specified so.
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('error', (e) => console.error(e))
ipfs.on('ready', async () => {
  const orbitdb = new OrbitDB(ipfs)

  // Create / Open a database
  const db = await orbitdb.log('hello')
  await db.load()

  // Listen for updates from peers
  db.events.on('replicated', (address) => {
    console.log(db.iterator({ limit: -1 }).collect())
  })

  // Add an entry
  const hash = await db.add('world')
  console.log(hash)

  // Query
  const result = db.iterator({ limit: -1 }).collect()
  console.log(JSON.stringify(result, null, 2))
})
export default class App extends React.Component {
  render() {
    return (
      <View>
        <ShowAllBooksScreen />
      </View>

    );
  }
}

