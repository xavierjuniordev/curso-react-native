
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import api from "./src/services/api";

export default function App() {

    const [projects, setProjects] = useState([]) 

    useEffect(() => {
      api.get('projeto').then(response => {
        console.log(response.data)
        setProjects(response.data)
      })
    }, []);

    async function handleAddProject(){
      const response = await api.post('projeto', {
        title: `Projetos`,
        dev: 'Dev test'
      })

      const project = response.data
      setProjects([...projects, project])
    }

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

      <TouchableOpacity actionOpacity={0.8} style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>
          Adicionar Projeto
        </Text>
      </TouchableOpacity>

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
    backgroundColor: '#64B1AD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color:'#501CAD',
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
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#0000F6',
    margin: 20,
    height: 50,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#ED7107',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
