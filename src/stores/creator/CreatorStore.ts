import { ICreator } from "../../types/creator/creator.ts";
import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

// 제작자 스토어
interface CreatorStore {
    creators: ICreator[]; // 제작자 리스트
    setCreators: (creators: ICreator[]) => void;

    searchQuery: string; // 검색 쿼리
    setSearchQuery: (query: string) => void;

    selectedCreator: ICreator | null; // 제작자 선택
    setSelectedCreator: (creator: ICreator | null) => void;

    isInitialized: boolean; // 초기화 여부
    setInitialized: (initialized: boolean) => void;
}

const useCreatorStore = create(
    persist<CreatorStore>(
        (set) => ({
            creators: [],
            setCreators: (creators) => set({ creators }),

            searchQuery: "",
            setSearchQuery: (query) => set({ searchQuery: query }),

            selectedCreator: null,
            setSelectedCreator: (creator) => set({ selectedCreator: creator }),

            isInitialized: false,
            setInitialized: (initialized) => set({ isInitialized: initialized }),
        }),
        {
            name: "creator-storage", // 로컬 스토리지 키 이름
            storage: createJSONStorage(() => localStorage) // 데이터 저장하고 복구하는 방법
        }
    )
);

export default useCreatorStore;
