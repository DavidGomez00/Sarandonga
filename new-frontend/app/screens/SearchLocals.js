import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useForm} from 'react-hook-form';

import SearchBar from '../components/SearchBar';
import locals from '../api/locals';

function SearchLocals({navigation}) {

    const {control, handleSubmit} = useForm({});
    const [locales, setLocales] = useState([{nombre: 'A', direccion: 'B', genero: 'Pop'}]);

    const renderLocales = () => {
        let array = [];
        locales.map((item, index) => {
            array.push(
                <View key={index} style={{height: 150, width: 150, borderWidth: 2, borderColor: '#000'}}>
                    <Text>Nombre: {item.nombre}</Text>
                    <Text>Direccion: {item.direccion}</Text>
                    <Text>Genero: {item.genero}</Text>
                </View>
            );
        })
    }

    const handleSearch = async(data) => {
        const result = await locals.getList(data.search);
        if (!result.ok) {
            alert('Ha habido un error');
        } else {
            setLocales(result.data);
            console.log(result.data);
        }
    }

    return (
        <SafeAreaView style={{padding: 25}}>
            <SearchBar 
                control={control}
                name="search"
                handleSearch={handleSubmit(handleSearch)}
            />
            {renderLocales}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9c9c9c',
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 10,
    }
});

export default SearchLocals;