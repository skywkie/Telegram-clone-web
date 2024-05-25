import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

addRxPlugin(RxDBDevModePlugin);

const db = await createRxDatabase({
  name: "users",
  storage: getRxStorageDexie({
    clusterFile: "",
  }),
});

await db.addCollections({
  users: {
    schema: mySchema,
  },
});

const result = await db.users
  .find({
    selector: {
      name: "foobar",
    },
  })
  .exec();
