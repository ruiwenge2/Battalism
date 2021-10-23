function embedded() {
  try {
    return window.self !== window.top;
  } catch(e) {
    return true;
  }
}

if(embedded()){
  document.body.innerHTML = `<p>Please open this in a <a href="https://game.ruiwenge2.repl.co" target="_blank">new tab</a> for best results.`;
}