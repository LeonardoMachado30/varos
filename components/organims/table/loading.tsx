export default function LoadingTable() {
  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <div className="h-[400px] bg-[#1a1c1d] border border-[#222729] rounded-lg" />
        <section className="md:hidden">
          <div className="h-[400px] bg-[#1a1c1d] border border-[#222729] rounded-lg" />
        </section>
      </div>
    </>
  );
}
