// dialer.js
function process(profile) {
  // 容错处理，防止没有节点时报错
  if (!profile.proxies) return; 

  var proxies = profile.proxies;
  var new_proxies =[];

  for (var i = 0; i < proxies.length; i++) {
    // 根据你的规则，匹配私有节点
    if (/(MY|Private|PVT|个人|私|個)/i.test(proxies[i].name)) {
      
      // 1. 深度克隆节点，避免修改原节点
      var relayed = JSON.parse(JSON.stringify(proxies[i]));
      
      // 2. 替换节点名字中的关键字
      // 例如："MY_香港机器" 会变成 "🚇转发_香港机器"
      // 这样不仅改了名，还移除了原有的 "MY" 关键字，防止后续正则误抓
      relayed.name = proxies[i].name.replace(/(MY|Private|PVT|个人|私|個)/i, "🚇转发");
      
      // 3. 核心魔法：注入 dialer-proxy，指向你的中转代理组
      relayed["dialer-proxy"] = "🚀 手动切换";
      
      new_proxies.push(relayed);
    }
  }

  // 将克隆生成的中转节点追加到总节点列表中
  for (var j = 0; j < new_proxies.length; j++) {
    proxies.push(new_proxies[j]);
  }
}
