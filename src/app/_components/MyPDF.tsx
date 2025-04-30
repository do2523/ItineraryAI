// Import necessary components from @react-pdf/renderer for building PDF documents
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// This import appears unnecessary and unused; it can be safely removed
import { title } from "process";

// Define styles for the PDF document using react-pdf's StyleSheet
const styles = StyleSheet.create({
  page: { padding: 30 }, // Adds padding around the entire page
  dayTitle: {
    fontSize: 20,
    marginVertical: 10,
    textDecoration: "underline", // Underlines the day title for emphasis
  },
  activity: { marginBottom: 10 }, // Adds spacing between each activity block
  time: {
    fontSize: 14,
    fontWeight: "bold", // Makes the activity time bold
  },
  name: {
    fontSize: 16,
    marginBottom: 2, // Slight spacing below the activity name
  },
  description: {
    fontSize: 12,
    marginBottom: 4, // Adds spacing below the description text
  },
  cost: {
    fontSize: 12,
    marginBottom: 6, // Adds spacing below the cost text
  },
});

// Define a functional React component to generate the itinerary PDF
export function ItineraryPDF({ data }: { data: any[] }) {
  return (
    <Document>
      {/* Define a single A4-sized page with padding */}
      <Page size="A4" style={styles.page}>
        {/* Iterate through each day in the itinerary data array */}
        {data.map((day, index) => (
          <View key={index}>
            {/* Display the title for the day (e.g., "Day 1") */}
            <Text style={styles.dayTitle}>{day.day}</Text>

            {/* Iterate through each activity within the current day */}
            {day.activities.map((activity: any, idx: number) => (
              <View key={idx} style={styles.activity}>
                {/* Display activity details: time, name, description, and cost */}
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
