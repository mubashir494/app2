export const searchCustomer = async (db, query) => {
  let str = queryBuilder(query);
  try {
    const customerData = await db.query(
      `select c.id,c.name,c.guarantor,address_type.name,a.addr1,a.addr2,a.city,a.state,a.zip,a.country,
      svc1.crid,svc2.crid,svc3.crid
    from customer c
      inner join address a on c.id=a.idnum and a.idtype='customer'
      inner join address_type on a.type=address_type.id
      left outer join Contact_wireless_data svc1 on c.id=svc1.d_custid
      left outer join contact_fttx_data svc2 on c.id=svc2.d_custid
      left outer join contact_dsl_data svc3 on c.id=svc3.d_custid
    where a.addr1 like '%'+${query}+'%' OR a.addr2 like '%'+${query}+'%'
      OR a.city like '%'+${query}+'%' OR a.state like '%'+${query}+'%'
      OR a.zip like '%'+${query}+'%' OR a.country like '%'+${query}+'%'
    order by c.id`)

    
    
    return customerData;
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
