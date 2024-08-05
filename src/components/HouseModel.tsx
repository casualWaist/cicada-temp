import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import {GLTF} from "three-stdlib";
import * as THREE from "three";
import {useGLTF, useTexture} from "@react-three/drei";
import {AppContext, AxiosContext} from "@/components/AppState";
import {useThree} from "@react-three/fiber";
import {PerspectiveCamera} from "three";
import {VaultRoom} from "@/components/VaultRoom";
import {MapRoom} from "@/components/MapRoom";
import {QuestRoom} from "@/components/QuestRoom";

type Props = JSX.IntrinsicElements['group'];

const HouseModel = forwardRef<THREE.Group, Props>((props: Props, ref) => {
    const camera = useThree((state) => state.camera as PerspectiveCamera);
    const [appState, setAppState] = useContext(AppContext);
    const axios = useContext(AxiosContext);

    useEffect(() => {
        camera.fov = 35;
        camera.updateProjectionMatrix();
        const getLiveCnt = async () => {
            const response = await axios.get("/quest/live_count");
            if (response.data.status) {
                setAppState({userLives: response.data.data});
            }
        };
        const getQuestStatus = async () => {
            try {
                let response = await axios.get("/quest/get_quest_status");
                setAppState({...response.data});
            } catch (err) {

            }
        };
        getQuestStatus();
        getLiveCnt();
    }, [])

    return <group ref={ref} rotation={[0, 0, 0]} {...props} dispose={null}>
        {appState.section === 'map' ? <MapRoom/> : null}
        {appState.section === 'vaults' ? <VaultRoom/> : null}
        {appState.section === 'quests' ? <QuestRoom/> : null}
    </group>
});
export default HouseModel
HouseModel.displayName = 'HouseModel';
useGLTF.preload('/placeholder.glb');
