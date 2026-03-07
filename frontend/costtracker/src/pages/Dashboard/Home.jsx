import { useEffect, useState } from "react";
import  DashboardLayout  from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { InfoCard } from "../../components/Cards/InfoCard";
import { RecentTransactions } from "../../components/Dashboard/RecentTransactions";
import { FinancialOverview } from "./FinancialOverview";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";

import {IoMdCard} from "react-icons/io";
import { ExpenseTransactions } from "./ExpenseTransactions";
import { Last30DaysExpenses } from "./Last30DaysExpenses";
import { RecentIncomeWithChart } from "./RecentIncomeWithChart";
import { RecentIncome } from "./RecentIncome";

export const Home = ()=> {
useUserAuth();

const navigate = useNavigate();

const [dashboardData, setDashboardData] = useState(null);
const [loading, setLoading] = useState(false);

const fetchDashboardData = async () => {
    if(!loading){
        setLoading(true)
    }

    try{
        const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
      
        if(response.data){
            setDashboardData(response.data)
           
            
               
        }
    }catch(error){
            console.log("Something went wrong, Please try again later ", error)
    }finally{
        setLoading(false)
    }
}

useEffect(()=>{
    fetchDashboardData()
     console.log("DASHBOARD DATA COMPLETA →", dashboardData);
    
    console.log("LAST 30 DAYS EXPENSE", dashboardData?.last30DaysExpenses);
    return ()=>{}

},[])


useEffect(() => {
    if (!dashboardData) return;

   /*  console.log("📌 DASHBOARD DATA:", dashboardData);
    console.log("📌 LAST 30 DAYS EXPENSES:", dashboardData.last30DaysExpenses);
    console.log("📌 LAST 60 DAYS INCOME:", dashboardData.last60DaysIncome); */

}, [dashboardData]);


    return(
        <DashboardLayout activeMenu="Dashboard">
             <div className="my-5 mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-200 border border-gray-200">
              
                 <InfoCard
                icon={<IoMdCard/>}
                label="Total Balance"
                value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                color="bg-primary"
                />

                 <InfoCard
                icon={<LuWalletMinimal/>}
                label="Total Income"
                value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                color="bg-orange-500"
                />

                 <InfoCard
                icon={<LuHandCoins/>}
                label="Total Expense"
                value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
                color="bg-red-500"
                /> 
                </div> 

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
                   <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onSeeMore={()=> navigate("/expense")}
                        /> 
                    <FinancialOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpenses || 0}
                        />  
 
                        <ExpenseTransactions
                            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                            onSeeMore={()=> navigate("/expense")}
                            />

                        <Last30DaysExpenses
                            data={dashboardData?.last30DaysExpenses?.transactions || []}
                            /> 

                             <RecentIncome 
                              transactions={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
                              onSeeMore={()=> navigate("/income")} 
                              /> 
 
                            <RecentIncomeWithChart
                                data={dashboardData?.last60DaysIncome?.transaction?.slice(0,4) || []}
                                totalIncome={dashboardData?.totalIncome || 0}
                                /> 
                            
                           
                </div> 
            
            </div>
        </DashboardLayout>
    )
}