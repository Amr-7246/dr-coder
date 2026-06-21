export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="py-30">
            {children}
        </section>
    );
}