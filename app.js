import { MongoClient } from 'mongodb'

const myDB = {
    server: 'localhost',
    port: 27017,
}
const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try {
    await client.connect()
    if (client.db('admin').command({ "ping": 1 }))
        console.log("Conectado!");
    else throw Error("Erro ao conectar ao banco !!")

    const produto = {
        id_prod: 130,
        nome: "TV LG 5G 8K",
        descricao: "SmartTV LG 8K Model LG20228k5g",
        importado: true,
        preco: 14450,
        qtd_estoque: 300
    }

    const result = await client.db('loja')          //seleciona o banco
                            .collection('produtos') //seleciona a colecao
                            .insertOne(produto)     //insere o novo produto
    console.log(result.acknowledged && 'Produto Inserido!!')
} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}