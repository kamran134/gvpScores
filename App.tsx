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
        }
        else if (score2 > 24 && ((score2 - score1) > 1)) {
            setSetMatch(2);
            setSetPoint(0);
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

    console.log('scores', scores);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {addTeamsModal && <Modal>
                <View style={{padding: 20}}>
                    <View>
                        <TextInput
                            onChangeText={setTeam1Name}
                            placeholder='Team 1 name'
                            style={{borderBottomWidth: 1}} />
                    </View>
                    <View>
                        <TextInput
                            onChangeText={setTeam2Name}
                            placeholder='Team 2 name'
                            style={{borderBottomWidth: 1}} />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{marginTop: 20, borderRadius: 10, padding: 10, backgroundColor: '#27ae60'}}
                            onPress={() => setAddTeamsModal(false)}
                        >
                            <Text>Add teams</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View style={{height: windowHeight}}>
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
                            <Text style={styles.scoreButtonText}>{setMatch === 1 ? 'WINNER' : setMatch === 2 ? 'LOOSER' : score1}</Text>
                            <Text style={styles.scoreButtonText}>{setPoint === 1 && 'SET POINT'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={setMatch > 0}
                            onPress={() => setScore2(score2 + 1)}
                            onLongPress={() => setScore2(score2 - 1)}
                            style={[styles.scoreButton, styles.scoreButton2]}>
                            <Text>{team2Name}</Text>
                            <Text style={styles.scoreButtonText}>{setMatch === 2 ? 'WINNER' : setMatch === 1 ? 'LOOSER' : score2}</Text>
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
                    <GameList scores={scores} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

interface GameListProps {
    scores: IScores[];
}

const GameList: React.FC<GameListProps> = (props) => {
    return (
        <View style={{marginTop: 20}}>
            {props.scores.map(score => <View key={score.game}
                style={{flexDirection: 'row', padding: 20, backgroundColor: '#34495e', justifyContent: 'space-around', marginBottom: 10}}>
                <View><Text>{score.team1.name}: {score.team1.score}</Text></View>
                <View><Text style={{marginLeft: 20}}>{score.team2.name}: {score.team2.score}</Text></View>
            </View>)}
        </View>
    );
}

const styles = StyleSheet.create({
    scoreButton: {
        width: '50%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
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

    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
