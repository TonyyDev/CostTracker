import { LuArrowRight } from "react-icons/lu"
import { TransactionInfoCard } from "../../components/Cards/TransactionInfoCard"
import moment from "moment"




export const RecentIncome = ({transactions, onSeeMore}) => {

     
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Income</h5>
            <button className="card-btn" onClick={onSeeMore}>See All<LuArrowRight className="text-base"/>
            </button>
        </div>
            {transactions?.slice(0,5)?.map((item)=>(
                <TransactionInfoCard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYYY")}
                    amount={item.amount}
                    type="income"
                    hideDeleteBtn
                    />
            ))}

    </div>
  )
}
