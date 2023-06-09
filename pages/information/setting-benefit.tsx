export default function settingBenefit(){

    return (
        <div>
            <div className={'flex-col text-center mt-10 font-semibold'}>
                <h2 className={'font-extrabold text-3xl mb-10'}>역할 1</h2>
                <div className={'w-full '}>
                <span>역할을 의사로 줬을때</span>
                    <img className={'mt-3 mx-auto'} src={'/static/images/has-role.png'} alt={'역할이 있을때'} width={1000} height={1000} />
                </div>
                <div className={'w-full'}>
                <span>역할을 아무것도 주지 않았을때</span>
                    <img className={'mt-3 mx-auto'} src={'/static/images/has-no-role.png'} alt={'역할이 없을때'} width={1000} height={1000} />
                </div>
                <h2 className={'font-extrabold text-3xl mb-10'}>역할 2</h2>
                <div className={'w-full '}>
                    <span>역할을 점술사로 줬을때</span>
                    <img className={'mt-3 mx-auto'} src={'/static/images/has-role2.png'} alt={'역할이 있을때'} width={1000} height={1000} />
                </div>
                <div className={'w-full'}>
                    <span>역할을 아무것도 주지 않았을때</span>
                    <img className={'mt-3 mx-auto'} src={'/static/images/has-no-role2.png'} alt={'역할이 없을때'} width={1000} height={1000} />
                </div>
            </div>

            <div className={'flex-col text-center mt-10 font-semibold'}>
                <h2 className={'font-extrabold text-3xl mb-10'}>패널티</h2>
                <div className={'w-full'}>
                    <span>강력한 패널티를 줬을때</span>
                    <img className={'mt-3  mx-auto'} src={'/static/images/strong-penalty.png'} alt={'강력한 패널티'} width={1000} height={1000} />
                </div>
                <div className={'w-full'}>
                    <span>패널티를 마이너스로 줬을때</span>
                    <img className={'mt-3  mx-auto'} src={'/static/images/minus-penalty.png'} alt={'매우 약한 패널티'} width={1000} height={1000} />
                </div>
            </div>
    </div>)
}
