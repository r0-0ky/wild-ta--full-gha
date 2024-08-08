import asyncio

from aiogram import Router, Bot, Dispatcher
from aiogram.types import Message, WebAppInfo
from aiogram.filters import CommandStart, CommandObject
from aiogram.enums import ParseMode
from aiogram.utils.keyboard import InlineKeyboardBuilder
from src.settings import settings
from dotenv import load_dotenv
load_dotenv()

bot_key = settings.BOT

def webapp_builder() -> InlineKeyboardBuilder:
    builder = InlineKeyboardBuilder()
    builder.button(
        text="🍋 🍊 Запустить WebApp",
        web_app=WebAppInfo(
           url=settings.WEBAPP_URL, HapticFeedback=True
        )
    )
    return builder.as_markup()

router = Router()


@router.message(CommandStart())
async def start(message: Message, command: CommandObject, bot: Bot):
    first_name = message.from_user.first_name
    await message.answer(f"Привет {first_name}, ниже ссылка для запуска WebApp",
                         reply_markup=webapp_builder())


async def main() -> None:
    bot = Bot(bot_key, parse_mode=ParseMode.HTML)
    dp = Dispatcher()
    dp.include_router(router)

    await bot.delete_webhook(True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
