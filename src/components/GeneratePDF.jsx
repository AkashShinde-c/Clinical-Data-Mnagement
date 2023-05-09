import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import "../CSS/GeneratePDF.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
  },
  section: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#0077be",
  },
  paragraph: {
    fontSize: "15px",
    color: "black",
    fontWeight: "normal",
    marginTop: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    textIndent: "10",
  },
  info: {
    fontSize: "12px",
    color: "black",
    width: "25%",
    alignSelf: "flex-start",
    marginLeft: "20",
    marginTop: "10",
     
  },
});

export default function GeneratePDF() {
  return (
    <div className="pdfContainer">
      <PDFViewer>
        <Document>
          <Page>
            <View style={styles.section}>
              <Text>Sai Clinic</Text>
              <View style={{ backgroundColor: "#0077be", width: "95%" }}>
                <Text style={{ fontSize: "1px" }}>.</Text>
              </View>
              <View style={styles.info}>
                 <View>
                 <Text>Patient Name</Text>
                  <Text style={{ marginLeft:0 }}>Akash Shinde</Text>
                 </View>
                 
                  {/* {"\n"}Visit Date 09/05/2023{"\n"}Age 21 */}
                
              </View>
              <View style={styles.paragraph}>
                <Text>
                  Mr. Akash Shinde was diagnosed with Common Cold on 09/05/2023
                  by Dr. Siddhesh Pardeshi. Following is the Medication
                  suggested for the treatment.
                </Text>
                <Text>Paracetamol</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
