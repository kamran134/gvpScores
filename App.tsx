/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable,
SafeAreaView,
ScrollView,
StatusBar,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
useColorScheme,
View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { IScores, ITeam } from './src/models/team.model';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [score1, setScore1] = useState<number>(0);
    const [score2, setScore2] = useState<number>(0);
    const [setPoint, setSetPoint] = useState<number>(0);
    const [setMatch, setSetMatch] = useState<number>(0);
    const [game, setGame] = useState<number>(0);
    const [addTeamsModal, setAddTeamsModal] = useState<boolean>(false);
    const [belarusModal, setBelarusModal] = useState<boolean>(false);
    const [team1Name, setTeam1Name] = useState<string | undefined>(undefined);
    const [team2Name, setTeam2Name] = useState<string | undefined>(undefined);
    const [scores, setScores] = useState<IScores[]> ([]);

    useEffect(() => {
        setTimeout(SplashScreen.hide, 500);
    }, []);

    useEffect(() => {
        if (score1 > 24 && ((score1 - score2) > 1)) {
            setSetMatch(1);
            setSetPoint(0);
            setBelarusModal(true);
        }
        else if (score2 > 24 && ((score2 - score1) > 1)) {
            setSetMatch(2);
            setSetPoint(0);
            setBelarusModal(true);
        }
        else if (score1 >= 24 && (score1 > score2)) {
            setSetMatch(0);
            setSetPoint(1);
        }
        else if (score2 >= 24 && (score2 > score1)) {
            setSetMatch(0);
            setSetPoint(2);
        }
        else {
            setSetPoint(0);
            setSetMatch(0);
        }
    }, [score1, score2]);

    const newGameHandler = () => {
        if (game > 0) setScores([...scores, {
            game,
            team1: {name: team1Name!, score: score1},
            team2: {name: team2Name!, score: score2}}
        ]);
        setSetPoint(0);
        setSetMatch(0);
        setScore1(0);
        setScore2(0);
        setGame(game + 1);
        setAddTeamsModal(true);
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {addTeamsModal && <Modal>
                <View style={{padding: 20}}>
                    <View>
                        <TextInput
                            onChangeText={setTeam1Name}
                            placeholder='LEFT SIDE TEAM NAME'
                            style={{borderBottomWidth: 1}} />
                    </View>
                    <View>
                        <TextInput
                            onChangeText={setTeam2Name}
                            placeholder='RIGHT SIDE TEAM NAME'
                            style={{borderBottomWidth: 1}} />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{marginTop: 20, borderRadius: 10, padding: 10, backgroundColor: '#27ae60', alignSelf: 'flex-start'}}
                            onPress={() => setAddTeamsModal(false)}
                        >
                            <Text>Add teams</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}
            {belarusModal && <Modal>
                <View style={{alignItems: 'center'}}>
                    <View style={{padding: 12}}>
                        <Image source={require('./src/assets/belarus_map.png')} style={{width: windowWidth - 24, height: 400}} />
                    </View>
                    <View style={{padding: 12}}>
                        <Text>
                            А я сейчас вам покажу откуда н-на Беларусь готовилось нападение. И если бы за шесть часов до операции не был нанесён превентивный удар по позициям, —
                            четыре позиции, я сейчас покажу, карты привёз, — они бы атаковали наши войска, Беларуси и России, которые были на учениях. Так что, не мы
                            развязали эту войну, у нас совесть чиста. Хорошо, что начали.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setBelarusModal(false)}
                        style={{borderWidth: 1, width: 50, height: 50, borderRadius: 25, borderColor: '#7f8c8d', alignItems: 'center', justifyContent: 'center'}}>
                        <Text>x</Text>
                    </TouchableOpacity>
                </View>
            </Modal>}
            <View style={{height: windowHeight}}>
                <View style={{marginBottom: 12}}>
                    <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '600'}}>GREAT VOLLEYBALL PLAYERS</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <TouchableOpacity
                            disabled={setMatch > 0}
                            onPress={() => setScore1(score1 + 1)}
                            onLongPress={() => setScore1(score1 - 1)}
                            style={[styles.scoreButton, styles.scoreButton1]}>
                            
                            <Text>{team1Name}</Text>
                            <Text style={styles.scoreText}>{score1}</Text>
                            <Text style={styles.scoreButtonText}>{setMatch === 1 ? 'WINNER' : setMatch === 2 ? 'LOOSER' : ''}</Text>
                            <Text style={styles.scoreButtonText}>{setPoint === 1 && 'SET POINT'}</Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={setMatch > 0}
                            onPress={() => setScore2(score2 + 1)}
                            onLongPress={() => setScore2(score2 - 1)}
                            style={[styles.scoreButton, styles.scoreButton2]}>
                            <Text>{team2Name}</Text>
                            <Text style={styles.scoreText}>{score2}</Text>
                            <Text style={styles.scoreButtonText}>{setMatch === 2 ? 'WINNER' : setMatch === 1 ? 'LOOSER' : ''}</Text>
                            <Text style={styles.scoreButtonText}>{setPoint === 2 && 'SET POINT'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'flex-start'}}>
                        <TouchableOpacity
                            onPress={newGameHandler}
                            style={{backgroundColor: '#27ae60', padding: 10, borderRadius: 10}}>
                            <Text>New Game</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={scores}
                    keyExtractor={(item, index) => item.game.toString()}
                    renderItem={({item}) => <GameList score={item} />}
                    contentContainerStyle={{paddingHorizontal: 12}}
                />
                <View style={{padding: 12}}>
                    <Text>{'Все очки Мири зануляются © 2022'}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

interface GameListProps {
    score: IScores;
}

const GameList: React.FC<GameListProps> = ({score}) => {
    return (
         <View key={score.game}
            style={{flexDirection: 'row', padding: 20, backgroundColor: '#34495e', justifyContent: 'space-around', marginBottom: 10}}>
            <View><Text>{score.team1.name}: {score.team1.score}</Text></View>
            <View><Text style={{marginLeft: 20}}>{score.team2.name}: {score.team2.score}</Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    scoreButton: {
        width: '50%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12
    },
    scoreButton1: {
        backgroundColor: '#e74c3c',
    },
    scoreButton2: {
        backgroundColor: '#2980b9'
    },
    scoreButtonText: {
        fontSize: 20,
        fontWeight: '600'
    },
    scoreText: {
        fontSize: 100,
        fontWeight: '600'
    }
});

export default App;
