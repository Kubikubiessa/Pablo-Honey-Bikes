import React from "react";
import ContractApi from "../api/api";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';


/** contract template in pdf format
 */

async function ContractTemplate({ name,email, cell, propertyId, leaseTerm, price, date}) {
  console.debug("Contract Template");

 
  let property = await ContractApi.getProperty(propertyId);
  const rentalAddress = property.address;


  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>
              BIKE RENTAL CONTRACT
              {rentalAddress} {leaseTerm} {price}
              Customer:_{name}_  Date: _{date}_ 
              Cell:_{cell}_
              Email:_{email}_
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}


export default ContractTemplate;