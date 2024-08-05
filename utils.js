export const rollSkillCheck = (dc=11) => {
    // difficuly class (dc) guide
    // low = 7 (%70 to succeed)
    // medium = 11 (%50 to succeed)
    // high = 15 (%30 to succeed)
    const roll = Math.floor(Math.random() * 20) + 1
    return roll >= dc
}

export const selectUseItem = async player => {
    // creates list of cunsumable items to show player
    let itemsOptions = []; player.items.map(item => {if(item.type === "consumable") itemsOptions.push(item.title)})
    await inquirer.prompt([{
        name: "user_choice",
        message: "What item do you want to use?\n",
        type: "list",
        choices: itemsOptions
    }])
    .then(answer => {
        // uses item and removes it
        player.useItem(answer.use_choice)
    })
    return player
}