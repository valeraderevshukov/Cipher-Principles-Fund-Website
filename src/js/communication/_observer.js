export default (function() {
  const EVENTS = {};
  const SUB = (eventName, callBack) => {
    if (!EVENTS[eventName]) EVENTS[eventName] = [];
    EVENTS[eventName].push(callBack);
    return callBack;
  };

  const UNSUB = (eventName, callBack) => {
    if (!EVENTS[eventName] || !EVENTS[eventName].length) return;
    EVENTS[eventName] = EVENTS[eventName].filter(fn => fn!==callBack);
  };
	
  const ON_FIRE = function(eventName) {
    if (!EVENTS[eventName] || !EVENTS[eventName].length) return;
    const arg = [].slice.call(arguments, 1);
    EVENTS[eventName].forEach( fn => fn(arg));
  };

  return { SUB, UNSUB, ON_FIRE };

})();
