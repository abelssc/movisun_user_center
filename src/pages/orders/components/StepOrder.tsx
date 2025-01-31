import { useOrder } from "../../../context/OrderContext";
import { convertirTimestamp } from "../../../utils/helpers";

type StepOrder={
    step:number;
    index:number;
}
type Step = 0 | 10 | 20 | 25 | 30 | 40;

const stateList: { [key: string]: [string] } = {
    "0": ["Cancelado"],
    "10": ["Pendiente de Pago"], // pendiente de pago
    "20": ["Recibido"], // recibido
    "25": ["Confirmar Pedido"],
    "30": ["Enviar Pedido"], // confirmado
    "40": ["Entregado"], // entregado
  };

  
  const StepOrder = ({ step,index }:StepOrder) => {
    const {steps,order,currentStep,setCurrentStep} = useOrder();
  
    // Determina si el paso está completado, activo o futuro
    const isCompleted = currentStep >= step;
    // console.log(step,isCompleted);
    
    const isNextStep = currentStep < steps[index] && (index === 0 || currentStep >= steps[index - 1]);
   
    const stepColor = isCompleted ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800";
  
    return (
      <li className={"md:shrink md:basis-0  group flex gap-x-2 md:block " + (step === 40 ? "flex-0" : "flex-1")}>
        <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
          <button
            onClick={() => setCurrentStep(step as Step)}
            className={`size-7 flex justify-center items-center shrink-0 font-medium rounded-full transition ${
              isNextStep ? "hover:bg-blue-500 hover:text-white" : ""
            } ${stepColor}`}
          >
            {index+1}
          </button>
          {
            step !== 40 &&
            <div
                className={`mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden ${
                isCompleted ? "bg-blue-500" : "bg-gray-200"
                }`}
            ></div>
        }
        </div>
        <div className="grow md:grow-0 md:mt-3 pb-5">
          <span className="block text-sm font-medium text-gray-800 dark:text-gray-50">
            {stateList[String(step)]?.[0] || "Estado desconocido"}
          </span>
            {(step === 20 && isCompleted && order?.add_time) && (
            <p className="text-sm text-gray-400">
                {convertirTimestamp(order.add_time, true, true)}
            </p>
            )}
            {(step === 25 && isCompleted && order?.confirm_time && order.confirm_time!=="0") && (
            <p className="text-sm text-gray-400">
                {convertirTimestamp(order.confirm_time, true, true)}
            </p>
            )}
            {(step === 30 && isCompleted && order?.delay_time && order.delay_time!=="0") && (
            <p className="text-sm text-gray-400">
                {convertirTimestamp(order.delay_time , true, true)}
            </p>
            )}
            {(step === 40 && isCompleted && order?.finnshed_time && order.finnshed_time!=="0") && (
            <p className="text-sm text-gray-400">
                {convertirTimestamp(order?.finnshed_time, true, true)}
            </p>
            )}

            {((currentStep === 0 || currentStep === 10) && step===20) && (
                <p className="text-sm text-red-500">
                    {order?.order_state ? stateList[order.order_state][0] || "" : ""}
                </p>
            )}
        </div>
      </li>
    );
  };
  
  export default StepOrder;
  