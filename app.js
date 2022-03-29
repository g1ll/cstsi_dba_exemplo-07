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

    //consulta simples
    //SELECT * FROM produtos
    const resultados = await client.db('loja').collection('produtos').find().toArray()

    //consulta com projeção
    // const resultados = await client.db('loja').collection('produtos').find({},
    //     {
    //         projection: {
    //             _id:0,
    //             id_prod: 1,
    //             nome:1,
    //             importado:1,
    //             preco: 1
    //         }
    //     }).toArray()

    //especificando os campos que não queremos que apareçam
    // const resultados = await client.db('loja').collection('produtos')
    //     .find({},
    //         {
    //             projection: {
    //                 _id: 0,
    //                 qtd_estoque: 0,
    //                 descricao: 0
    //             }
    //         }).toArray()
    //resultados.map((produto,index)=>console.log(`${index} | ${produto.id_prod} | ${produto.nome} | ${produto.preco} | ${produto.importado}`))
    
    //Usando o Projection como um método
    // const resultados = await client.db('loja').collection('produtos')
    //     .find().project({
    //                 _id: 0,
    //                 qtd_estoque: 0,
    //                 descricao: 0
    //             }).toArray()

    //Exemplo de ordenação com a opção sort
    // const resultados = await client.db('loja').collection('produtos')
    //     .find({},{
    //            sort:{preco:1},
    //            projection: { _id: 0,qtd_estoque: 0, descricao: 0}
    //         }).toArray()

    //Usando o Sort como um método
    // const resultados = await client.db('loja').collection('produtos')
    //     .find().sort({preco:-1}).project({
    //                 _id: 0,
    //                 qtd_estoque: 0,
    //                 descricao: 0
    //             }).toArray()

    //Exemplo de filtro de dados
    // const resultados = await client.db('loja').collection('produtos')
    //     .find({
    //             // preco:{$lt:15000},
    //             importado:{$eq:false},
    //             qtd_estoque:{$gte:200}
    //         },
    //         {   
    //             sort:{qtd_estoque:1},
    //             projection: { _id: 0, descricao: 0}
    //         }).toArray()

    //Exemplo de operadores de comparação
    // const filtro = {
    //     importado:{$eq:false},//produtos nacionais
    //     qtd_estoque:{$gte:200}//com 200 ou mais itens em estoque
    // }
    // const opcoes = {   
    //     sort:{qtd_estoque:1},
    //     projection: { _id: 0,preco: 0, descricao: 0}
    // }

    // //Exemplo de filtro com in ou nin
    // const filtro = {
    //     id_prod:{$nin:[111,115,125,124,136,114]}
    // }

    //OPERADORES LÓGICOS
    //AND
    // const filtro = {
    //         $and:[ // V e V -> V
    //             {preco:{$gte:3000}}, //3k-9k
    //             {preco:{$lte:9000}}
    //         ]
    //     }

    //NOT
    // const filtro = {
    //     preco:{$not:{$gte:5000}} //$lt
    // }

    //OR
    // const filtro = {
    //     $or: [
    //         { qtd_estoque: { $lt: 100 } },
    //         { qtd_estoque: { $eq: 150 } },
    //     ]
    // }
    
    //NOR
    // const filtro = {
    //     $nor: [
    //         { qtd_estoque: { $lt: 100 } },
    //         { qtd_estoque: { $eq: 150 } },
    //     ]
    // }
    
    // const opcoes = { 
    //     sort: { qtd_estoque: 1 },
    //     projection: { _id: 0, descricao: 0 }
    //  }

    // const collection = client.db('loja').collection('produtos')
    // const resultados = await collection.find(filtro, opcoes).toArray()

    console.table(resultados)

} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}