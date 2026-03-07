import { useEffect, useState } from "react"
import { prepareExpenseBarCharData } from "../../utils/helper";
import { CustomBarChart } from "../../components/Charts/CustomBarChart";



export const Last30DaysExpenses = ({data}) => {
  
const [chartData, setCharData] = useState([]);

useEffect(()=>{

    console.log("📌 DATA RECIBIDA EN Last30DaysExpenses:", data);
    const result = prepareExpenseBarCharData(data);
     console.log("📌 DATA PREPARADA PARA EL GRAFICO:", result);
    setCharData(result);
    
    return ()=>{}

},[data])



  
    return (
    <div className="card col-span-1">
        <div className="flex item-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>
        <CustomBarChart data={chartData} /> 
    </div>
  )
}
