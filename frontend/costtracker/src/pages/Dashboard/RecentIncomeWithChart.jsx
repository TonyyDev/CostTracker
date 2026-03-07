import { useEffect, useState } from "react"
import { CustompieChart } from "../../components/Charts/CustompieChart"


const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

export const RecentIncomeWithChart = ({data, totalIncome}) => {

const [charData, setCharData] = useState([]);


const prepareCharArr = () => {
    const dataArr = data?.map((item) => ({
        name: item?.source,
        amount: item?.amount
    }))
        setCharData(dataArr);
        
}

useEffect(()=>{
 prepareCharArr();
 // console.log(" Datos del gráfico:", data);
 // console.log(" Datos procesados (charData):", data?.map(i => ({ name: i?.source, amount: i?.amount })));

 
 return ()=>{}

},[data])


  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 60 Days Income</h5>
        </div>
        <CustompieChart
            data={charData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
            />
    </div>
  )
}
