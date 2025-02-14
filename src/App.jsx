import { useState } from 'react';
import Header from "./components/Header/Header";
import UserInput3 from "./components/UserInput/UserInput3";
import UserInput4 from "./components/UserInput/UserInput4";
import ResultTable3 from "./components/ResultTable/ResultTable3";
import ResultTable4 from "./components/ResultTable/ResultTable4";


const App = () => {
  const tableData3 =[];
  const tableData4 =[];

  // State for UserInput3
  const [userInput3, setUserInput3] = useState({
    retirementGoal: 20000,
    inflationAdjustment: 4,
    currentAge: 30,
    fromAge: 65,
    toAge: 85,
    postRetirementReturn: 4
  });

  // State for UserInput4
  const [userInput4, setUserInput4] = useState({
    monthlySavings: { stock: 0, mpf: 3000, other: 0, extra: 11708.9651157578 },
    existingAssets: { stock: 200000, mpf: 300000, other: 300000, extra: 0 },
    expectedReturn: { stock: 5, mpf: 5, other: 0.1, extra: 5 }
  });
  
  const combinedInputs = {
    ...userInput3,
    ...userInput4,
    duration: userInput3.toAge - userInput3.fromAge
  };

  //console.log('All inputs:', combinedInputs);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Calculate the first row of data

  let row_Year = [];
  let row_Age  = [];
  let row_Stock  = [];
  let row_MPF  = [];
  let row_Other  = [];
  let row_Extra  = [];
  let row_sum =[];
  

  row_Year[0] = new Date().getFullYear();
  row_Age[0]=Number(combinedInputs.currentAge);
  row_Stock[0]=       calculateValue(combinedInputs.expectedReturn.stock, combinedInputs.monthlySavings.stock, combinedInputs.existingAssets.stock);
  row_MPF[0]=         calculateValue(combinedInputs.expectedReturn.mpf,   combinedInputs.monthlySavings.mpf, combinedInputs.existingAssets.mpf);
  row_Other[0] =calculateValue(combinedInputs.expectedReturn.other, combinedInputs.monthlySavings.other, combinedInputs.existingAssets.other);
  row_Extra[0] =calculateValue(combinedInputs.expectedReturn.extra, combinedInputs.monthlySavings.extra, combinedInputs.existingAssets.extra);
  row_sum[0] = row_Stock[0] + row_MPF[0] +row_Other[0] +row_Extra[0];
  tableData4.push({
    // feel free to change the shape of the data pushed to the array!
    year: row_Year[0],
    age: row_Age[0],
    stock: row_Stock[0],
    mpf: row_MPF[0],
    other: row_Other[0],
    extra: row_Extra[0],
    sum: row_sum[0]
  });

  //Calculate the rest of row of data
  const numOfWrokingYear = combinedInputs.fromAge - combinedInputs.currentAge;
  //console.log('numOfWrokingYear:',numOfWrokingYear);
  

  for (let i = 1; i < numOfWrokingYear; i++) {
     
    row_Year[i] = row_Year[i-1] + 1;
    row_Age[i] = row_Age[i-1] + 1;
    row_Stock[i]=  calculateValue(combinedInputs.expectedReturn.stock, combinedInputs.monthlySavings.stock,row_Stock[i-1]);
    row_MPF[i]=  calculateValue(combinedInputs.expectedReturn.mpf, combinedInputs.monthlySavings.mpf,row_MPF[i-1]);
    row_Other[i]=  calculateValue(combinedInputs.expectedReturn.other, combinedInputs.monthlySavings.other,row_Other[i-1]);
    row_Extra[i]=  calculateValue(combinedInputs.expectedReturn.extra, combinedInputs.monthlySavings.extra,row_Extra[i-1]);
    row_sum[i] =   row_Stock[i] + row_MPF[i] +row_Other[i] +row_Extra[i];
      
    tableData4.push({
      // feel free to change the shape of the data pushed to the array!
      year: row_Year[i],
      age: row_Age[i],
      stock: row_Stock[i],
      mpf: row_MPF[i],
      other: row_Other[i],
      extra: row_Extra[i],
      sum: row_sum[i]
    });
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let row_Year3 = [];
  let row_Age3  = [];
  let row_D  = [];
  let row_E  = [];
  let row_F  = [];
  let row_G  = [];

  row_Year3[0] = Math.max(...row_Year);
  row_Age3[0] = Math.max(...row_Age);
  row_D[0] = "";
  row_E[0] = "";
  row_F[0] = "";
  row_G[0] = Math.max(...row_sum);
  console.log(row_G[0])
  tableData3.push({
    // feel free to change the shape of the data pushed to the array!
    year: row_Year3[0],
    age: row_Age3[0],
    D: row_D[0],
    E: row_E[0],
    F: row_F[0],
    G: row_G[0],
    
  });
  const D2 = combinedInputs.retirementGoal * Math.pow(1 + combinedInputs.inflationAdjustment/100, combinedInputs.fromAge - combinedInputs.currentAge);
  const E2 = D2 * 12;
  const F2 = (row_G[0] - E2) *combinedInputs.postRetirementReturn/100; 
  const G2 = row_G[0] - E2 + F2;
  
  row_Year3[1] = row_Year3[0]+1;
  row_Age3[1] = row_Age3[0]+1;
  row_D[1] = D2;
  row_E[1] = E2;
  row_F[1] = F2;
  row_G[1] = G2;
  tableData3.push({
    // feel free to change the shape of the data pushed to the array!
    year: row_Year3[1],
    age: row_Age3[1],
    D: row_D[1],
    E: row_E[1],
    F: row_F[1],
    G: row_G[1],
    
  });

  for (let i = 2; i < combinedInputs.toAge - combinedInputs.fromAge+2; i++) {
     
    row_Year3[i] = row_Year3[i-1] + 1;
    row_Age3[i] = row_Age3[i-1] + 1;
    row_D[i]=  row_D[i-1] *( 1 + combinedInputs.inflationAdjustment/100);
    //row_D[i]=  row_D[i-1];
    //row_D[i]=  1000;
    row_E[i]=  row_D[i]*12;
    row_F[i]=  (row_G[i-1]-row_E[i])*combinedInputs.postRetirementReturn/100;
    row_G[i]=  row_G[i-1]-row_E[i]+row_F[i];
    
      
    tableData3.push({
      // feel free to change the shape of the data pushed to the array!
      year: row_Year3[i],
      age: row_Age3[i],
      D: row_D[i],
      E: row_E[i],
      F: row_F[i],
      G: row_G[i]
    });
  }


  ///////////////////////////////////////////////////////////////////////////
  const calculateLeftSeek = (G24) => {
    
    let G17;
    const G18 = combinedInputs.inflationAdjustment/100;
    const G19 = combinedInputs.currentAge;
    const G20 = combinedInputs.toAge;
    const G21 = combinedInputs.postRetirementReturn/100;
    const E20 = combinedInputs.fromAge
    ;
    // Combine and process inputs from both forms
    if (G21 === G18) {
      G17 = G24 / ((G20 - E20 + 1) * 12 * Math.pow(1 + G18, E20 - G19));
    } else {
      G17 = (G24 * (G21 - G18) /((1 - Math.pow((1 + G18) / (1 + G21), G20 - E20 + 1)) * 12 * Math.pow(1 + G18, E20 - G19) * (1 + G21)) );
    }
    
    //console.log('G17', G17);
    setUserInput3(prev => ({
      ...prev,
      retirementGoal: G17
    }));
    //console.log('All inputs:', combinedInputs);
    // Add your calculation logic here
  };

  const calculateRightSeek = (lastRowOfStock,lastRowOfMPF,lastRowOfOther) => {
    
    let P18;

    const P19 = combinedInputs.existingAssets.extra;
    const P20 = combinedInputs.expectedReturn.extra/100;
    const G17 = combinedInputs.retirementGoal;

    const G18 = combinedInputs.inflationAdjustment/100;
    const G19 = combinedInputs.currentAge;
    const G20 = combinedInputs.toAge;
    const G21 = combinedInputs.postRetirementReturn/100;
    const E20 = combinedInputs.fromAge;
    
    console.log('retirementGoal', G17);
    console.log('inflationAdjustment', G18);

    // Combine and process inputs from both forms
    let G24;
    if (G21=== G18) {
        G24 = G17 * (G20 - E20 + 1) * 12 * Math.pow(1 + G18, E20 - G19);
      } else {
        G24 =(G17 * (1 - Math.pow((1 + G18) / (1 + G21), G20 - E20 + 1)) * 12 * Math.pow(1 + G18, E20 - G19) * (1 + G21)) / (G21 - G18);
      };
      
    const lastRowOfExtra = G24 - lastRowOfStock -lastRowOfMPF - lastRowOfOther;
    //console.log('G24', G24);  
    // console.log('lastRowOfStock', lastRowOfStock);  
    // console.log('lastRowOfMPF', lastRowOfMPF);  
    // console.log('lastRowOfOther', lastRowOfOther);  
    //console.log('lastRowOfExtra', lastRowOfExtra);
    
    //P18 = ((G24 - P19 * Math.pow(1 + P20 / 12, 12 * (E20 - G19))) * (P20 / 12)) / (Math.pow(1 + P20 / 12, 12 * (E20 - G19)) - 1);
    //G24 = 13302506;
    P18 =  (lastRowOfExtra - P19 * (1 + P20 / 12) ** (12 * (E20 - G19))) * (P20 / 12) / ((1 + P20 / 12) ** (12 * (E20 - G19)) - 1);
 
    
    //console.log('P18', P18); 
    
    // setUserInput4(prev => ({
    //   ...prev,
    //   monthlySavings: {...prev, extra: P18 },
    // }));
    setUserInput4(prev => ({
      ...prev,
      monthlySavings: {
        ...prev.monthlySavings,  // Preserve other savings values
        extra: P18               // Update only the extra field
      }
    }));
    // Add your calculation logic here
  };

  return (
    <div className="main-app">
      <style>{`
        .main-app {
          max-width: 1600px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
        }
        
        .input-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
          gap: 30px;
          margin: 2rem 0;
          //font-size: 48px;
        }
        
        .result td {
          font-size: 18px;  /* 調大字體 */
          padding: 0px;    /* 增加間距 */
          text-align: center;
          //border: 1px solid #ddd; /* 加上邊框 */
        }

        @media (max-width: 768px) {
          .input-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      {/*<Header />*/}
      
      <div className="input-container">
        <UserInput3 
          inputs={userInput3}
          setInputs={setUserInput3}
          onCalculate={()=>calculateLeftSeek(row_G[0])}
        />
        <UserInput4 
          inputs={userInput4}
          setInputs={setUserInput4}
          onCalculate={()=>calculateRightSeek(row_Stock[row_Stock.length - 1],row_MPF[row_MPF.length - 1],row_Other[row_Other.length - 1])}
        />
      </div >
      <div className="input-container">
      <ResultTable3 data={tableData3}/>
      <ResultTable4 data={tableData4}/>
      </div>
    </div>
  );
};


function calculateValue(expetedReturn, monthlySaving, existingAsset) {
  const rate = expetedReturn /100 / 12;
  const nper = 12;
  
  // FV 計算公式：FV = PMT * [(1 + rate)^nper - 1] / rate
  
  
  const FV =  monthlySaving * ((Math.pow(1 + rate, nper) - 1) / rate);
  const Lumpsum = existingAsset  * Math.pow(1 + rate, 12)
  // 最終計算
  //return Math.round(FV + Lumpsum);
  return (FV + Lumpsum);

}
export default App;