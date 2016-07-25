export default {
  isActionInGivenObject(actions, currentAction) {
    for(const actionTitle in actions) {
      if(actions[actionTitle] === currentAction) {
        return true;
      }
    }
    return false;
  }
}