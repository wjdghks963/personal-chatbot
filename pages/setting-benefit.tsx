import Image from "next/image";
import hasRole from "../src/assets/has-role.png"
import hasNoRole from "../src/assets/has-no-role.png"
import strongPanelty from "../src/assets/strong-panelty.png"
import minusPanelty from "../src/assets/minus-panelty.png"

export default function settingBenefit(){

    return (
        <div>
            <div className={'flex-col text-center mt-10 font-semibold'}>
                <h2 className={'font-extrabold text-3xl mb-10'}>역할</h2>
                <div className={'w-full'}>
                <span>역할을 의사로 줬을때</span>
                    <Image className={'mt-3'} src={hasRole} alt={'역할이 없을때'}/>
                </div>
                <div className={'w-full'}>
                <span>역할을 아무것도 주지 않았을때</span>
                <Image className={'mt-3'} src={hasNoRole} alt={'역할이 없을때'}/>
                </div>
            </div>

            <div className={'flex-col text-center mt-10 font-semibold'}>
                <h2 className={'font-extrabold text-3xl mb-10'}>패널티</h2>
                <div className={'w-full'}>
                    <span>강력한 패널티를 줬을때</span>
                    <Image className={'mt-3'} src={strongPanelty} alt={'강력한 패널티'}/>
                </div>
                <div className={'w-full'}>
                    <span>패널티를 마이너스로 줬을때</span>
                    <Image className={'mt-3'} src={minusPanelty} alt={'매우 약한 패널티'}/>
                </div>
            </div>
    </div>)
}