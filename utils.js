export const rollSkillCheck = (dc=11) => {
    // difficuly class (dc) guide
    // low = 7 (%70 to succeed)
    // medium = 11 (%50 to succeed)
    // high = 15 (%30 to succeed)
    const roll = Math.floor(Math.random() * 20) + 1
    return roll >= dc
}