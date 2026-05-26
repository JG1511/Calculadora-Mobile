import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function Calculadora() {

    const [expression, setExpression] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const buttons: string[] = ['C', 'DEL', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.', '(', ')'];

    const handleButtonPress = (valueButton: string) => {

        // Atualiza a expressão com o valor do botão pressionado, concatendo o valor do botão à expressão atual

        if (valueButton === '=') {
            try {
                const evalResult = eval(expression);
                setResult(evalResult.toString());
            } catch (error) {
                setResult('Error');
                alert('Invalid expression');
            }
        } else if (valueButton === 'C') {
            setExpression('');
            setResult('');
        } else if (valueButton === 'DEL') {
            setExpression((prev) => prev.toString().slice(0, -1));
            setResult('');
        } else {
            // Atualiza a expressão com o valor do botão pressionado, concatendo o valor do botão à expressão atual
            setExpression((prev) => prev + valueButton);
        }
    }

    return (
        <View style={stylesCalc.container}>
            <View style={stylesCalc.display}>
                <Text style={stylesCalc.expression}>{expression || '0'}</Text>
                <Text style={stylesCalc.result}>{result}</Text>
            </View>
            <View style={stylesCalc.buttonsContainer}>
                {buttons.map((valuesButton) => (
                    <TouchableHighlight style={stylesCalc.button} key={valuesButton} onPress={() => (handleButtonPress(valuesButton))}>
                        <Text style={stylesCalc.buttonText}>{valuesButton}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        </View>

    )


}

const stylesCalc = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        padding: 20,
        justifyContent: 'center',
    },
    display: {
        backgroundColor: "#2c2c2c",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    expression: {
        color: '#fff',
        fontSize: 24,
    },
    result: {
        color: "#00ff99",
        fontSize: 26,
        marginTop: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Permite que os botões sejam organizados em várias linhas, quabrando para a próxima linha quando necessário
        justifyContent: 'center',
        gap: 10,
    },
    button: {
        width: 70,
        height: 70,
        backgroundColor: '#333',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },


})