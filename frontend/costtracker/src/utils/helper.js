import moment from "moment";


export const validateEmail  = (email) =>{
    const regex = /^[^\s@]+@[^\@]+\.[^\s@]+$/;
    return regex.test(email);
}





export const getInitials = (name)=>{

    if(!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i< Math.min(words.length,2); i++){
        initials += words[i][0]; 
    }

    return initials.toUpperCase(); 
}


export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;  
}


export const prepareExpenseBarCharData = (data = [])=> {

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const charData = data.map((item)=> {
        const date = item?.date ? new Date(item.date) : null;
        const month = date ? months[date.getMonth()] : "N/A";

        return{
            category: item?.category,
            amount: item?.amount,
            month: month
        }
    })

    return charData
}


export const prepareIncomeBarChartData = (data= [])=> { 
//console.log("Data original:", data);
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const charData = sortedData.map((item)=> ({
        month: moment(item?.date).format('Do MMM'),
        source: item?.source,
        amount: item?.amount,
    }))
    
    return charData; 
}


export const prepareExpenseLineCharData = ( data = [] ) =>{

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

    const charData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }))

    return charData;
     
}