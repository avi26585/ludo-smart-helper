import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  const [dice, setDice] = useState(1);
  const [my, setMy] = useState([0,0,0,0]);
  const [opp, setOpp] = useState([0,0,0,0]);
  const safe = [0,8,13,21,26,34,39,47];

  function isKill(p){return opp.includes(p);}
  function isSafe(p){return safe.includes(p);}

  function suggest(){
    let best=-1, pri=-1;
    my.forEach((val,i)=>{
      const next = val + dice;
      if(next<=57){
        if(isKill(next) && pri<3){best=i;pri=3;}
        else if(isSafe(next) && pri<2){best=i;pri=2;}
        else if(pri<1){best=i;pri=1;}
      }
    });
    if(best==-1) return "No valid move";
    return `Move token ${best+1} from ${my[best]} to ${my[best]+dice}`;
  }

  return (
    <div style={{padding:20,fontFamily:"sans-serif"}}>
      <h2>🎯 Ludo Smart Helper (Basic)</h2>
      <div>
        <label>Dice (1‑6):</label>
        <input type="number" min="1" max="6" value={dice}
          onChange={e=>setDice(+e.target.value)} />
      </div>
      <div>
        <label>Your tokens (0‑57):</label>
        {my.map((v,i)=><input key={i} type="number" min="0" max="57"
          value={v} onChange={e=>{const a=[...my];a[i]=+e.target.value;setMy(a);}} />)}
      </div>
      <div>
        <label>Opponent:</label>
        {opp.map((v,i)=><input key={i} type="number" min="0" max="57"
          value={v} onChange={e=>{const a=[...opp];a[i]=+e.target.value;setOpp(a);}} />)}
      </div>
      <button onClick={()=>alert(suggest())}>Suggest Best Move</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
