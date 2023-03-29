import NavBarLayout from "../../src/components/NavBarLayout";
import Link from "next/link";

export  default function InformationInfo () {

    return(
        <NavBarLayout styleAdd={'flex-col items-center justify-center'}>

            <div className={'flex-col text-center w-full h-full mt-10 space-y-10 scroll-auto'}>
                    <h1 className={'font-bold text-xl py-2 '}>OA의 기초</h1>
                <div className={'flex-col space-y-2 mx-10'}>
                    <span className={"block"}>OA는 Open ai의 api를 사용해 만든 앱입니다.</span>
                    <span className={"block"}>OA가 생각을 끝내기까지 오래걸리는 질문은 대답할 때까지 시간이 오래 걸릴 수 있어요.</span>
                    <h2 className={'font-semibold py-2'}>만들게 된 계기</h2>
                    <span className={'block'}>chatGPT는 설정하지 않고 질문해도 원하는 대답을 해줄 만큼 충분히 똑똑하지만 설정한다면 조금 더 창의적이거나 전문적인 대답을 할 수 있습니다.</span>
                    <span className={'block'}>설정을 손 쉽게 할 수 있게 함으로서 AI에 대한 지식이 약한 더 많은 사람들이 자신의 상황에 맞는 대답을 받을 수 있습니다.</span>
                    <span className={'block'}>OA에게 내가 필요한 <span className={'text-blue-700'}>이름과 역할</span>을 주고 원하는 대답을 받아보세요.</span>
                    <span className={'block'}>예를 들면 역할은 영어 선생님으로 설정하고 메시지로 {`"나에게 친절하게 공부할 영어단어 5개를 추천해줘"`}라고 한다면 역할을 주지 않았을 때 보다 더 좋은 답변을 줄거에요. </span>
                </div>
                    <h1 className={'font-bold text-xl'}>오류</h1>
                <div className={'flex-col mx-10 space-y-2'}>
                    <span className={'block'}>만약 오류가 발생한다면 상황과 스크린 샷을 함께 chsw000@gmail.com으로 보내주세요.</span>
                    <span className={'block'}>chatGPT에서 데이터를 받기 때문에 생각치 못한 오류가 발생할 수 있습니다. 그외 아래 사항들을 주의해 주세요</span>
                    <h2 className={'font-semibold py-2 text-red-500'}>주의점</h2>
                    <ul className={'space-y-2 list-decimal text-start'}>
                        <li><span className={'block text-blue-500 font-semibold'}>영어 기반</span>메시지와 역할들은 기본적으로 영어로 번역되어 이해합니다. <br/>한국에만 있는 단어, 직업을 적는다면 이해하기 어려울 수 있어요.</li>
                        <li><span className={'block text-blue-500 font-semibold'}>토큰 초과</span>너무 많은 글자(150자 이상)를 입력하지 말아주세요.</li>
                        <li><span className={'block text-blue-500 font-semibold'}>개인 정보</span>민감한 개인정보가 관련된 이야기는 삼가주세요. <br/>입력된 데이터는 OA가 아니라 chatGPT에서 수집합니다.</li>
                        <li><span className={'block text-blue-500 font-semibold'}>AI의 역량</span>최신 이야기는 대답하기 어려워요. chatGPT는 21년까지의 데이터로 훈련되어 있어요. 물론 학습이 가능하지만 까먹을 수 있어요.</li>
                        <li>난해한 질문은 대답하기 어려워요.</li>
                        <li>오늘 날씨나 교통 같은 현재와 관련된 대답은 할 수 없어요.</li>
                        <li>모든 정보의 참/거짓을 판별하지 못하기 때문에 잘못된 정보를 토대로 대답할 수 있어요.</li>
                    </ul>
                </div>
                <div className={'flex-col space-y-2 pb-10 mx-10'}>
                    <h1 className={'font-bold text-xl'}>OA 더 잘 사용하기</h1>
                    <Link href={"/information/setting-benefit"}>
                        <span className={'block text-blue-300 underline mt-4'}>역할이나 패널티를 줘야하는 이유</span>
                    </Link>
                    <h2 className={'font-semibold py-2 text-blue-500'}>OA 부리기</h2>
                    <ul className={'space-y-2 list-decimal text-start'}>
                        <li><span className={'block text-blue-500 font-semibold'}>영어 기반</span>영어로 질문, 역할 부여하면 답변이 더 빠르고 정확해요. 하지만 답변도 영어로 와요.</li>
                        <li><span className={'block text-blue-500 font-semibold'}>역할 부여</span>설정에서 역할을 부여한다면 관련된 지식을 가진 상태가 되고 그에 대한 전문적인 대답을 할 수 있어요.<br/> 여러가지 역할을 가진 앱들을 모두 다운하고 사용할 필요없이 OA는 설정 하나만으로 모든 앱들의 역할을 할 수 있어요.</li>
                        <li><span className={'block text-blue-500 font-semibold'}>패널티 부여</span>AI에게 패널티란 중요한 요소입니다. 강력할수록 더 명확한 답변을 주기 때문에 무조건 강력한 것이 좋지만 적절하게 낮은 패널티가 생각하지 못한 창의적인 답변이 나올 수 있어요.</li>
                        <li><span className={'block text-blue-500 font-semibold'}>토큰 초과</span>너무 많은 글자로 질문을 하게되면 답변을 하는데 시간이 오래 걸리고 질문이 AI에게 가지 않을 수 있어요.</li>
                    </ul>
                </div>
            </div>
        </NavBarLayout>
        )

    }
