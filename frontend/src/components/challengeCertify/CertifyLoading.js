import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ContractAPI from "../../api/ContractAPI";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import UserAPI from "../../api/UserAPI";

function CertifyLoading() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(0);
  const [cnt, setCnt] = useState(0);
  const url = useLocation().state.url;
  const challenge = useLocation().state.challengeInfo;
  const percentage = useLocation().state.percentage;

  useEffect(() => {
    const Contract = new ContractAPI();
    async function load() {
      await Contract.findingChallenger(Number(id), user.id).then((response) => {
        getChallengerInfo(response[0]);
      });
    }

    async function getChallengerInfo(challengerId) {
      await Contract.findByChallengerId(challengerId).then((response) => {
        //console.log(response);
        if (cnt === 0) setCnt(Number(response.totalCount));
        if (Number(response.totalCount) === cnt + 1) {
          addPhoto();
          navigate(`/challenge-certify/${id}`, {
            state: { challengeInfo: challenge, percentage: percentage },
          });
        }
      });
      setCheck(check + 1);
    }

    async function addPhoto() {
      const body = {
        userId: user.id,
        photoUrl: url,
      };
      await UserAPI.addPhoto(body).then((response) => {
        console.log("addphoto response", response);
        dispatch(setUserInfo(response.data.body));
      });
    }

    load();
  });

  return (
    <div>
      <h2>로딩중</h2>
    </div>
  );
}

export default CertifyLoading;
