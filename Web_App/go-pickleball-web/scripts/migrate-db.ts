const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

// 加载环境变量
dotenv.config({ path: ".env.development" });

// 检查环境变量
if (!process.env.MONGODB_URI) {
  console.error("错误: MONGODB_URI 环境变量未设置");
  console.log("请在 .env.development 文件中设置 MONGODB_URI");
  console.log(
    "格式示例: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
  );
  process.exit(1);
}

const sourceUri = "mongodb://localhost:27017";
const targetUri = process.env.MONGODB_URI;

// 验证连接字符串格式
if (
  !targetUri.startsWith("mongodb://") &&
  !targetUri.startsWith("mongodb+srv://")
) {
  console.error("错误: MongoDB 连接字符串格式无效");
  console.log("连接字符串必须以 mongodb:// 或 mongodb+srv:// 开头");
  process.exit(1);
}

console.log("源数据库 URI:", sourceUri);
console.log(
  "目标数据库 URI:",
  targetUri.replace(/(mongodb(\+srv)?:\/\/)([^:]+):([^@]+)@/, "$1****:****@")
);

async function migrateData() {
  const sourceClient = new MongoClient(sourceUri);
  const targetClient = new MongoClient(targetUri);

  try {
    // 连接到源数据库和目标数据库
    console.log("正在连接到源数据库...");
    await sourceClient.connect();
    console.log("正在连接到目标数据库...");
    await targetClient.connect();

    console.log("已成功连接到源数据库和目标数据库");

    // 获取源数据库和目标数据库
    const sourceDb = sourceClient.db("go-pickleball");
    const targetDb = targetClient.db("go-pickleball");

    // 获取所有集合
    const collections = await sourceDb.listCollections().toArray();
    console.log(`找到 ${collections.length} 个集合需要迁移`);

    // 迁移每个集合
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`开始迁移集合: ${collectionName}`);

      // 获取集合中的所有文档
      const documents = await sourceDb
        .collection(collectionName)
        .find({})
        .toArray();
      console.log(`找到 ${documents.length} 个文档需要迁移`);

      if (documents.length > 0) {
        // 删除目标集合中的现有数据
        await targetDb.collection(collectionName).deleteMany({});
        console.log(`已清空目标集合: ${collectionName}`);

        // 插入新数据
        await targetDb.collection(collectionName).insertMany(documents);
        console.log(
          `已迁移 ${documents.length} 个文档到目标集合: ${collectionName}`
        );
      } else {
        console.log(`集合 ${collectionName} 为空，跳过迁移`);
      }
    }

    console.log("数据迁移完成！");
  } catch (error: any) {
    console.error("迁移过程中出错:", error);
    if (
      error &&
      typeof error.message === "string" &&
      error.message.includes("Authentication failed")
    ) {
      console.log("\n认证失败！请检查：");
      console.log("1. 用户名和密码是否正确");
      console.log("2. 数据库用户是否有正确的权限");
      console.log("3. IP 地址是否已添加到 MongoDB Atlas 的白名单中");
    }
  } finally {
    // 关闭数据库连接
    await sourceClient.close();
    await targetClient.close();
    console.log("数据库连接已关闭");
  }
}

// 执行迁移
migrateData();
