import SpecializationItem from "./SpecializationItem"

function LandingPage() {
    const spec_top_style = {
        backgroundColor: "blue",
        height: 100,
        width: 100
    }
    return (
		<div className="spec_section">
            <div className="spec_top" style={spec_top_style}>

            </div>
            <SpecializationItem />

    </div>
    )
}

export default LandingPage;