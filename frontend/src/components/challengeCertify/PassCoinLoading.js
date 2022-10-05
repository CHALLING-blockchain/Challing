import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ContractAPI from "../../api/ContractAPI";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUserInfo } from "../../app/redux/userSlice";
import UserAPI from "../../api/UserAPI";
import Loading from "../common/Loading";

function CertifyLoading() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(0);
  const [cnt, setCnt] = useState(-2);
  const url = useLocation().state.url;
  const challenge = useLocation().state.challengeInfo;

  useEffect(() => {
    const Contract = new ContractAPI();
    async function load() {
      const challenger = await Contract.findingChallenger(Number(id), user.id);
      getChallengerInfo(challenger[0]);
    }

    async function getChallengerInfo(challengerId) {
      await Contract.findByChallengerId(challengerId).then((response) => {
        if (cnt === -2) setCnt(Number(response.totalCount));
        if (Number(response.totalCount) === cnt + 1) {
          addPhoto();
          navigate(`/challenge-certify/${id}`, {
            state: {
              challengeInfo: challenge,
            },
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
        dispatch(setUserInfo(response.data.body));
      });
    }

    load();
  });

  return (
    <div>
      <Loading></Loading>
    </div>
  );
}

export default CertifyLoading;
