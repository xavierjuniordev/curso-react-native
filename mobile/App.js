
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import api from "./src/services/api";

export default function App() {

    const [projects, setProjects] = useState([]) 

    useEffect(() => {
      api.get('projeto').then(response => {
        console.log(response.data)
        setProjects(response.data)
      })
    }, [])

  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor="#000"/>
    <View style={styles.div}>
      <Text style={styles.title}>DevInDev</Text>
      <Text style={styles.description}>Developers In Development</Text>
      <Text style={styles.titleProjects}>Projetos:</Text>
      <FlatList
        style={styles.projectList}
        data={projects}
        keyExtractor={(project) => project.id}
        renderItem={({ item: project}) => (
        <Text style={styles.project} key={project.id}>
          {project.title}
        </Text> 
        )}
      />

   {/* <View style={styles.projects}>
      <Text style={styles.titleProjects}>Projetos:</Text>
    {projects.map((project) => (
        <Text style={styles.project} key={project.id}>
          {project.title}
          </Text>
      ))} 
    </View> */}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  div: {
    flex: 1,
    backgroundColor: '#0c94ac',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color:'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 60,
  },
  description: {
    color: 'pink',
    fontSize: 20,
  },
  projects: {
    marginTop: 10,
    alignItems: 'center',  
  },
  titleProjects: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },  
  project: {
    color: "yellow",
  },
});
