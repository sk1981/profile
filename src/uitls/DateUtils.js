export default {
  getCurrentTime() {
    return Date.now ? Date.now(): (new Date()).getTime();
  }
}