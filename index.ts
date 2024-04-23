#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000;
let myPin = 4486;

console.log(chalk.rgb(0,255,0).bold("Welcome to Muntazir Mohammad - ATM Machine"))
console.log(chalk.yellow.bold(`The pin is ${myPin}`))

let pinAnswer = await inquirer.prompt(
    [{
        name: "pin",
        message: "Enter Your Pin",
        type: "number",
    }]
)

if (pinAnswer.pin === myPin) {
    let operationAns = await inquirer.prompt(
        [
            {
                name: "operation",
                message: "Please select one option",
                type: "list",
                choices: ["Withdraw", "Check Balance"]
            }
        ]
    )

    if(operationAns.operation === "Withdraw"){
        let withdrawMethod = await inquirer.prompt(
            [
                {
                    name: "withdrawOption",
                    message: "Please select one option",
                    type: "list",
                    choices: ["Fast Cash", "Enter Amount"]
                }
            ]
        )

        if(withdrawMethod.withdrawOption === "Fast Cash") {
            let fastCashAns = await inquirer.prompt(
                [
                    {
                        name: "fastCashAmount",
                        message: "Select Amount",
                        type: "list",
                        choices: [1000, 2000, 5000, 7000, 10000],
                    }
                ]
            )

            myBalance -= fastCashAns.fastCashAmount

            console.log(chalk.yellow.bold(`Your transaction is successful, remaining balance is ${myBalance}`))
        }

        if(withdrawMethod.withdrawOption === "Enter Amount") {
            let amount = await inquirer.prompt(
                [
                    {
                        name: "amountAns",
                        message: "Enter Your Amount",
                        type: "number",
                    }
                ]
            )

            if(amount.amountAns <= myBalance){
                myBalance -= amount.amountAns
                console.log(chalk.yellow.bold(`Your transaction is successful, remaining balance is ${myBalance}`))
            }
            else {
                console.log(chalk.red.bold(`Your transaction was unsuccessful, Insufficient Balance!`))
            }
        }
    }
    else {
        console.log(chalk.yellow.bold(`Your current balance is ${myBalance}`))
    }
}
else {
    console.log(chalk.red.bold("Incorect Pin!"))
}
