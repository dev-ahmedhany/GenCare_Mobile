import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Disease {
  id: number;
  name: string;
  date: string;
  summary: string;
  image: string;
  details: string;
}

const diseases: Disease[] = [
    {
        id: 1,
        name: "Type 2 Diabetes",
        date: "2024-03-20",
        summary: "A chronic condition affecting how your body metabolizes sugar (glucose)...",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        details: "Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar (glucose). With type 2 diabetes, your body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels..."
    },
    {
        id: 2,
        name: "Hypertension",
        date: "2024-03-19",
        summary: "High blood pressure that can lead to severe health complications...",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        details: "Hypertension is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease. Blood pressure is determined both by the amount of blood your heart pumps and the amount of resistance to blood flow in your arteries..."
    },
    {
        id: 3,
        name: "Asthma",
        date: "2024-03-18",
        summary: "A condition in which airways narrow and swell and produce extra mucus...",
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
        details: "Asthma is a condition in which your airways narrow and swell and produce extra mucus. This can make breathing difficult and trigger coughing, wheezing and shortness of breath. For some people, asthma is a minor nuisance. For others, it can be a major problem that interferes with daily activities..."
    },
    {
        id: 4,
        name: "Arthritis",
        date: "2024-03-17",
        summary: "Inflammation of one or more joints, causing pain and stiffness...",
        image: "https://images.unsplash.com/photo-1578496781985-452d4a934d50",
        details: "Arthritis is the swelling and tenderness of one or more joints. The main symptoms of arthritis are joint pain and stiffness, which typically worsen with age. The most common types of arthritis are osteoarthritis and rheumatoid arthritis..."
    },
    {
        id: 5,
        name: "Depression",
        date: "2024-03-16",
        summary: "A mental health disorder characterized by persistently depressed mood...",
        image: "https://images.unsplash.com/photo-1541199249251-f713e6145474",
        details: "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. Also called major depressive disorder or clinical depression, it affects how you feel, think and behave and can lead to a variety of emotional and physical problems..."
    },
    {
        id: 6,
        name: "Heart Disease",
        date: "2024-03-15",
        summary: "Various conditions that affect the heart's structure and function...",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc",
        details: "Heart disease describes a range of conditions that affect your heart. Diseases under the heart disease umbrella include blood vessel diseases, such as coronary artery disease, heart rhythm problems (arrhythmias) and heart defects you're born with (congenital heart defects)..."
    },
    {
        id: 7,
        name: "Multiple Sclerosis",
        date: "2024-03-14",
        summary: "A disease in which the immune system eats away at the protective covering of nerves...",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
        details: "Multiple sclerosis (MS) is a potentially disabling disease of the brain and spinal cord (central nervous system). In MS, the immune system attacks the protective sheath (myelin) that covers nerve fibers and causes communication problems between your brain and the rest of your body..."
    },
    {
        id: 8,
        name: "Alzheimer's Disease",
        date: "2024-03-13",
        summary: "A progressive disorder that causes brain cells to degenerate and die...",
        image: "https://images.unsplash.com/photo-1559757152-0ce691b45704",
        details: "Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. Alzheimer's disease is the most common cause of dementia — a continuous decline in thinking, behavioral and social skills that affects a person's ability to function independently..."
    },
    {
        id: 9,
        name: "Celiac Disease",
        date: "2024-03-12",
        summary: "An immune reaction to eating gluten, a protein found in wheat, barley, and rye...",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        details: "Celiac disease is an immune reaction to eating gluten, a protein found in wheat, barley and rye. If you have celiac disease, eating gluten triggers an immune response in your small intestine. Over time, this reaction damages your small intestine's lining and prevents absorption of some nutrients..."
    },
    {
        id: 10,
        name: "Parkinson's Disease",
        date: "2024-03-11",
        summary: "A progressive nervous system disorder affecting movement...",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc",
        details: "Parkinson's disease is a progressive nervous system disorder that affects movement. Symptoms start gradually, sometimes starting with a barely noticeable tremor in just one hand. Tremors are common, but the disorder also commonly causes stiffness or slowing of movement..."
    }
];

export default function DiseasesPage() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: 'https://cdn.svgator.com/images/2022/06/background-svg-image-pattern.svg' }}
        style={styles.backgroundImage}
      />
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {diseases.map((disease) => (
          <Card 
            key={disease.id}
            style={styles.card}
            onPress={() => setSelectedDisease(disease)}
          >
            <CardContent style={styles.cardContent}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: disease.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.dateContainer}>
                  <ThemedText style={styles.date}>{disease.date}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.title}>{disease.name}</ThemedText>
              <ThemedText style={styles.summary}>{disease.summary}</ThemedText>
            </CardContent>
          </Card>
        ))}
      </ScrollView>

      {selectedDisease && (
        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: selectedDisease.image }}
            style={styles.detailsImage}
            resizeMode="cover"
          />
          <ThemedText style={styles.detailsTitle}>{selectedDisease.name}</ThemedText>
          <ThemedText style={styles.detailsText}>{selectedDisease.details}</ThemedText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  scrollViewContent: {
    paddingTop: 50,
    padding: 16,
    },
  card: {
    width: 300,
    marginRight: 16,
    marginVertical: 16,
    backgroundColor: '#fff',
  },
  cardContent: {
    padding: 0,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dateContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  date: {
    color: '#fff',
    fontSize: 12,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 10,
  },
  summary: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    width: '100%',
    marginHorizontal: 0,
    marginTop: 20,

    padding: 16,
    borderRadius: 0,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#000',
  },
  detailsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  detailsText: {
    color: '#aaa',
    lineHeight: 24,
    fontSize: 16,
  },
}); 