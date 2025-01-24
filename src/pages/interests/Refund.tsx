import Layout from "../../components/layouts/Layout"

const Refund = () => {
  return (
    <Layout>
        <div className="bg-white rounded-lg shadow-lg p-6 min-w-96 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Reembolsos</h1>
            <div>
                <p className="mb-2 font-medium">¿Cómo solicitar un reembolso?</p>
                <p className="mb-2">Para solicitar un reembolso, por favor comuníquese con nuestro servicio al cliente a través de nuestro whatsapp.</p>

                <p className="mb-2 font-medium">¿Cómo se procesan los reembolsos?</p>
                <p className="mb-2">Una vez que se haya aprobado su reembolso, el monto se acreditará en su cuenta en un plazo de 14 días hábiles. Por favor, tenga en cuenta que los reembolsos se procesan en la moneda y el número de cuenta original de pago.</p>
            </div>
        </div>
    </Layout>
  )
}

export default Refund