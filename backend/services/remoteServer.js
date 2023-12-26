export const searchCustomer = async (db, query) => {
  let str = queryBuilder(query);
  console.log(query)
  try {
    const customerData = await db.query(
      `select Distinct c.id,c.name,c.guarantor,address_type.name as address_type ,a.addr1,a.addr2,a.city,a.state,a.zip,a.country,
      svc1.crid as id1 ,svc2.crid as id2 ,svc3.crid as id3
    from customer c
      inner join address a on c.id=a.idnum and a.idtype='customer'
      inner join address_type on a.type=address_type.id
      left outer join Contact_wireless_data svc1 on c.id=svc1.d_custid
      left outer join contact_fttx_data svc2 on c.id=svc2.d_custid
      left outer join contact_dsl_data svc3 on c.id=svc3.d_custid
    where a.addr1 like Upper('%${str}%') OR a.addr2 like Upper('%${str}%')
      OR a.city like Upper('%${str}%') OR a.state like Upper('%${str}%')
      OR a.zip like Upper('%${str}%') OR a.country like Upper('%${str}%')
    order by c.id`)
    
    let crid = []
    let result = []

    console.log(customerData.recordset)
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

    console.log(result)
    
    
    return result;
  } catch (e) {
    console.log(e.message);
  }
};

const queryBuilder = (query) => {
  let str = "";
  query.split(" ").map((element) => {
    str = str + "%" + element;
  });
  str = str + "%";
  return str;
};
