// buyer dashboard component
// buyer login ke baad yahan redirect hoga

function BuyerDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="bg-white rounded-[28px] shadow-xl p-10 text-center">
        <h1 className="font-heading text-4xl font-bold text-[#0A1A2F]">
          Buyer Dashboard
        </h1>

        <p className="text-[#333333] mt-3">
          Buyer protected route working successfully.
        </p>
      </div>
    </div>
  );
}

export default BuyerDashboard;