import { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { IncomeOverview } from "../../components/Income/IncomeOverview";
import { Modal } from "../../components/layouts/Modal";
import { AddIncomeForm } from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import { IncomeList } from "../../components/Income/IncomeList";
import { DeleteAlert } from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";




export const Income = () => {
useUserAuth();

const [incomeData, setIncomeData] = useState([]);
const [loading, setLoading] = useState(false);
const [openDeleteAlert, setOpenDeleteAlert] = useState({show:false, data:null}); 

const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

//get all income
const fetchIncomeDetail = async () => {

  if(loading) return
  
  setLoading(true)


  try{
    const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)
    if(response.data){
      setIncomeData(response.data)
    }

  }catch(error){
        console.log("Something went wrong, please try again", error);
        
  }finally{
    setLoading(false)
  } 
}



const handleAddIncome = async (income)=>{
    const {source, amount, date, icon} = income

    if(!source.trim()){
      toast.error("Source is required.")
      return
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0.")
    }

    if(!date){
      toast.error("Date is required.")
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {source, amount, date, icon})
      setOpenAddIncomeModal(false)
      toast.success("Income added successfully.")
      fetchIncomeDetail()

    }catch(error){
      console.error("Error adding income:", error.response?.data?.message || error.message)
    }
}


const deleteIncome = async (id)=>{
  try{
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

    setOpenDeleteAlert({show: false, data: null})
    toast.success("Income delete successfully")
    fetchIncomeDetail()

  }catch(error){
    console.error("Error deleting income:", error.response?.data?.message || error.message);
    
  }
}


const handleDownloadIncomeDetails = async () => { 
  try{
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {responseType: "blob"})
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a") 
      link.href = url
      link.setAttribute("download", "income_ details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

    }catch(error){
        console.error("Error downloading income details", error)
        toast.error("Failed to download income details. Please try again later")
    }
}


useEffect(()=>{
  fetchIncomeDetail();

  return ()=>{}
},[])


  return (
     <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
              <div className="">
                <div className="">
                  <IncomeOverview
                    transactions={incomeData}
                    onAddIncome={()=> setOpenAddIncomeModal(true)}
                    />
                </div>

                  <IncomeList 
                    transactions={incomeData}
                    onDelete={(id) => {setOpenDeleteAlert({show: true, data: id})}}
                    onDownload={handleDownloadIncomeDetails}
                    />

              </div>
                  <Modal isOpen={openAddIncomeModal}
                      onClose={()=> setOpenAddIncomeModal(false)}
                      title="Add Income">
                      
                      <AddIncomeForm onAddIncome={handleAddIncome} />
                  </Modal>

                  <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({show: false, data: null})}
                    title="Delete Income"
                    >
                      <DeleteAlert 
                        content="Are you sure you want delete this income?"
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                        /> 
                    </Modal>
            </div>

    </DashboardLayout>
  )
}
