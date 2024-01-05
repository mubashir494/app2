import {search,Searcher} from "fast-fuzzy";

export const searchCustomer = async (db, query) => {
  const resultArray = query.split(' ');
  if(resultArray.length < 2){
    return null
  }
  else {
    let firstWord = resultArray[0];
    let restOfString = queryBuilder(resultArray.slice(1).join(' '));
    console.log(firstWord)
    console.log(restOfString)
    try {
      let customerData = await db.query(
        `select Distinct c.id,c.name,c.guarantor,address_type.name as address_type ,a.addr1,a.addr2,a.city,a.state,a.zip,a.country,
        svc1.crid as id1 ,svc2.crid as id2 ,svc3.crid as id3
      from customer c
        inner join address a on c.id=a.idnum and a.idtype='customer'
        inner join address_type on a.type=address_type.id
        left outer join Contact_wireless_data svc1 on c.id=svc1.d_custid
        left outer join contact_fttx_data svc2 on c.id=svc2.d_custid
        left outer join contact_dsl_data svc3 on c.id=svc3.d_custid
      where a.addr1 like Upper('${firstWord} %${restOfString}%') OR a.addr2 like Upper('${firstWord}%${restOfString}%')
        OR a.city like Upper('${firstWord}%${restOfString}%') OR a.state like Upper('${firstWord}%${restOfString}%')
        OR a.zip like Upper('${firstWord}%${restOfString}%') OR a.country like Upper('${firstWord}%${restOfString}%')
      order by c.id`)
      console.log(customerData.recordset)
  
      if(customerData.recordset.length == 0){
        console.log("Hello")
        customerData = await db.query(
          `select Distinct c.id,c.name,c.guarantor,address_type.name as address_type ,a.addr1,a.addr2,a.city,a.state,a.zip,a.country,
          svc1.crid as id1 ,svc2.crid as id2 ,svc3.crid as id3
        from customer c
          inner join address a on c.id=a.idnum and a.idtype='customer'
          inner join address_type on a.type=address_type.id
          left outer join Contact_wireless_data svc1 on c.id=svc1.d_custid
          left outer join contact_fttx_data svc2 on c.id=svc2.d_custid
          left outer join contact_dsl_data svc3 on c.id=svc3.d_custid
          where a.addr1 like Upper('${firstWord} ${resultArray[1]} %') OR a.addr2 like Upper('${firstWord}%')
        OR a.city like Upper('${firstWord}%') OR a.state like Upper('${firstWord}%')
        OR a.zip like Upper('${firstWord}%') OR a.country like Upper('${firstWord}%')
          order by c.id`)
        customerData.recordset = search(
          query,
          customerData.recordset,
          {keySelector: (obj) => obj.addr1},
        );
        customerData.recordset = filterArray(customerData.recordset)
      }
      let crid = []
      let result = []
  
      for (let i = 0;i<customerData.recordset.length;i++){
  
        if(!crid.includes(customerData.recordset[i].id)){
          customerData.recordset[i].address_type = [customerData.recordset[i].address_type]
          result.push(customerData.recordset[i])
          crid.push(customerData.recordset[i].id)
        }
        else{
          let record = result.find((record) => {return record.id == customerData.recordset[i].id})
          console.log(record)
          record.address_type.push(customerData.recordset[i].address_type)
        }
      }
      return result;
    } catch (e) {
      console.log(e.message);
    }
  }
};

const filterArray = (arr,query) =>{
  let address = []
  let record = []
  arr.map((element) =>{
    if(address.includes(element.addr1)){
      record.push(element)
    }
    else {
      if(address.length < 1){
        address.push(element.addr1)
        record.push(element)
      }
    }
  })
  return record

}
const queryBuilder = (query) => {
  let str = "";
  query.split(" ").map((element) => {
    str = str + "%" + element;
  });
  str = str + "%";
  return str;
};
