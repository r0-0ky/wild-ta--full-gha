from typing import Dict
from fastapi import APIRouter, WebSocket
import asyncio

from starlette.websockets import WebSocketDisconnect

from src.settings import redis_instance


ws_router = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: str, ws_type: str) -> bool:
        if user_id not in self.active_connections:
            self.active_connections[user_id] = {}
        if ws_type in self.active_connections[user_id]:
            return False
        await websocket.accept()
        self.active_connections[user_id][ws_type] = websocket
        return True

    def disconnect(self, user_id: str, ws_type: str):
        user_conns = self.active_connections.get(user_id)
        if user_conns and ws_type in user_conns:
            del user_conns[ws_type]
            if not user_conns:
                del self.active_connections[user_id]

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for user_conns in self.active_connections.values():
            for connection in user_conns.values():
                await connection.send_text(message)


manager = ConnectionManager()


@ws_router.websocket("/ws/coins_gain/{user_id}/")
async def websocket_count_gain(websocket: WebSocket, user_id: str):
    if not await manager.connect(websocket, f"test_{user_id}", "coins_gain"):
        await websocket.accept()
        await manager.send_message("WebSocket already open", websocket)
        await websocket.close()
        return
    try:
        while True:
            try:
                data = await websocket.receive_json()
                counter = float(data.get('coins'))
                if counter is not None:
                    redis_instance.set(f"test_counter_{user_id}", str(counter))
                    await manager.send_message(f"Counter updated: {counter}", websocket)
                else:
                    await manager.send_message("No counter provided", websocket)
                await asyncio.sleep(1)
            except WebSocketDisconnect:
                break
    except Exception as e:
        print(f"Error: {e}")
    finally:
        manager.disconnect(f"test_{user_id}", "coins_gain")


@ws_router.websocket("/ws/energy_gain/{user_id}/")
async def websocket_energy_gain(websocket: WebSocket, user_id: str):
    if not await manager.connect(websocket, f"test_{user_id}", "energy_gain"):
        await websocket.accept()
        await manager.send_message("WebSocket already open", websocket)
        await websocket.close()
        return
    try:
        while True:
            try:
                data = await websocket.receive_json()
                energy = float(data.get('energy'))
                if energy is not None:
                    redis_instance.set(f"test_energy_{user_id}", str(energy))
                    await manager.send_message(f"Energy updated: {energy}", websocket)
                else:
                    await manager.send_message("No energy provided", websocket)
                await asyncio.sleep(1)
            except WebSocketDisconnect:
                break
    except Exception as e:
        print(f"Error: {e}")
    finally:
        manager.disconnect(f"test_{user_id}", "energy_gain")