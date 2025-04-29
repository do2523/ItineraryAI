import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { title } from "process";

const styles = StyleSheet.create({
  page: { padding: 30 },
  dayTitle: { fontSize: 20, marginVertical: 10, textDecoration: "underline" },
  activity: { marginBottom: 10 },
  time: { fontSize: 14, fontWeight: "bold" },
  name: { fontSize: 16, marginBottom: 2 },
  description: { fontSize: 12, marginBottom: 4 },
  cost: { fontSize: 12, marginBottom: 6 },
});

export function ItineraryPDF({ data }: { data: any[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.map((day, index) => (
          <View key={index}>
            <Text style={styles.dayTitle}>{day.day}</Text>
            {day.activities.map((activity: any, idx: number) => (
              <View key={idx} style={styles.activity}>
                <Text style={styles.time}>{activity.time}</Text>
                <Text style={styles.name}>{activity.name}</Text>
                <Text style={styles.description}>{activity.description}</Text>
                <Text style={styles.cost}>Cost: ${activity.cost}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
